"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { ErrorDisplay } from "./ErrorDisplay";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Component Error Boundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          title={this.props.fallbackTitle || "Component Anomaly"}
          description={this.props.fallbackDescription || "An unexpected error occurred within this interface component."}
          error={this.state.error || new Error("Unknown error")}
          reset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
