"use client";

import { Component, type ReactNode } from "react";

/**
 * Keeps a WebGL failure (no GPU, context lost) from taking the page down:
 * the scene's slot shows `fallback` instead.
 */
export class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
