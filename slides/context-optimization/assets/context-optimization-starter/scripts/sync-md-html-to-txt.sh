#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Usage: %s [--once] <source-dir> <dest-dir>\n' "$0"
}

ONCE=0
if [ "${1:-}" = "--once" ]; then
  ONCE=1
  shift
fi

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
STARTER_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"


SRC_DIR="${1:-$STARTER_ROOT/docs}"
DEST_DIR="${2:-$STARTER_ROOT/.starter-output/drive-context}"
TRACK_FILE="$DEST_DIR/.sync_manifest"

if [ ! -d "$SRC_DIR" ]; then
  printf 'source directory does not exist: %s\n' "$SRC_DIR" >&2
  usage >&2
  exit 1
fi

mkdir -p "$DEST_DIR"
touch "$TRACK_FILE"

is_safe_rel_path() {
  case "$1" in
    ""|/*|../*|*/../*|*/..|..)
      return 1
      ;;
    *)
      return 0
      ;;
  esac
}

is_supported_source() {
  case "$1" in
    *.md|*.markdown|*.html|*.htm)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

target_for() {
  local rel="$1"
  case "$rel" in
    *.markdown) printf '%s/%s.txt' "$DEST_DIR" "${rel%.markdown}" ;;
    *.md) printf '%s/%s.txt' "$DEST_DIR" "${rel%.md}" ;;
    *.html) printf '%s/%s.html.txt' "$DEST_DIR" "${rel%.html}" ;;
    *.htm) printf '%s/%s.htm.txt' "$DEST_DIR" "${rel%.htm}" ;;
  esac
}

rewrite_manifest() {
  local tmp_file="${TRACK_FILE}.tmp"
  find "$SRC_DIR" -type f \( -name '*.md' -o -name '*.markdown' -o -name '*.html' -o -name '*.htm' \) | while IFS= read -r f; do
    printf '%s\n' "${f#$SRC_DIR/}"
  done > "$tmp_file"
  mv "$tmp_file" "$TRACK_FILE"
}

sync_one() {
  local src_file="$1"
  local rel_path="$2"
  local target_file
  target_file="$(target_for "$rel_path")"
  local action="Updated"

  if [ ! -f "$target_file" ]; then
    action="Created"
  fi

  mkdir -p "$(dirname "$target_file")"
  if pandoc "$src_file" -t plain --wrap=none -o "$target_file"; then
    printf '%s: %s\n' "$action" "$rel_path"
    return 0
  fi

  printf 'Failed: %s\n' "$rel_path" >&2
  return 1
}

catch_up_sync() {
  find "$SRC_DIR" -type f \( -name '*.md' -o -name '*.markdown' -o -name '*.html' -o -name '*.htm' \) | while IFS= read -r src_file; do
    rel_path="${src_file#$SRC_DIR/}"
    sync_one "$src_file" "$rel_path"
  done

  while IFS= read -r tracked; do
    [ -z "$tracked" ] && continue
    if ! is_safe_rel_path "$tracked"; then
      printf 'Skipping invalid manifest entry: %s\n' "$tracked" >&2
      continue
    fi

    src_file="$SRC_DIR/$tracked"
    target_file="$(target_for "$tracked")"
    if [ ! -f "$src_file" ] && [ -f "$target_file" ]; then
      rm "$target_file"
      printf 'Deleted: %s\n' "$tracked"
    fi
  done < "$TRACK_FILE"

  rewrite_manifest
}

if ! command -v pandoc >/dev/null 2>&1; then
  printf 'pandoc is required: https://github.com/jgm/pandoc\n' >&2
  exit 1
fi

catch_up_sync

if [ "$ONCE" -eq 1 ]; then
  exit 0
fi

if ! command -v entr >/dev/null 2>&1; then
  printf 'entr is required for watch mode. Re-run with --once or install entr.\n' >&2
  exit 1
fi

printf 'Watching %s for Markdown/HTML changes. Press Ctrl+C to stop.\n' "$SRC_DIR"
while true; do
  { find "$SRC_DIR" -type d; find "$SRC_DIR" -type f \( -name '*.md' -o -name '*.markdown' -o -name '*.html' -o -name '*.htm' \); } | entr -d "$0" --once "$SRC_DIR" "$DEST_DIR"
done
