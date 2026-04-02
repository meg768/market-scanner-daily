#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import argparse
import os
import platform
import subprocess
import sys
import webbrowser


def open_in_browser(url: str) -> bool:
    system = platform.system()

    commands = {
        "Darwin": [["open", url]],
        "Windows": [["cmd", "/c", "start", "", url]],
    }

    for command in commands.get(system, []):
        try:
            subprocess.Popen(command)
            return True
        except OSError:
            pass

    try:
        return webbrowser.open(url)
    except webbrowser.Error:
        return False


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Serve the Market Scanner Daily HTML page over localhost."
    )
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument(
        "--page",
        choices=["index", "design-preview"],
        default="index",
        help="Choose which HTML page to open by default.",
    )
    parser.add_argument(
        "--no-open",
        action="store_true",
        help="Start the local server without opening a browser window.",
    )
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    os.chdir(repo_root)

    server = ThreadingHTTPServer((args.host, args.port), SimpleHTTPRequestHandler)
    page_name = f"{args.page}.html"
    url = f"http://{args.host}:{args.port}/daily-page/{page_name}"
    design_url = f"http://{args.host}:{args.port}/daily-page/design-preview.html"
    live_url = f"http://{args.host}:{args.port}/daily-page/index.html"

    print(f"Serving Market Scanner Daily at {url}")
    print(f"Live scan page: {live_url}")
    print(f"Design preview page: {design_url}")
    print("Press Ctrl+C to stop the server.")

    if not args.no_open:
        opened = open_in_browser(url)
        if not opened:
            print(f"Could not auto-open a browser. Open this URL manually: {url}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping preview server.")
    finally:
        server.server_close()

    return 0


if __name__ == "__main__":
    sys.exit(main())
