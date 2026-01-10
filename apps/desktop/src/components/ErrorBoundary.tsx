import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-start gap-4 bg-background p-8 overflow-y-auto">
          <Card className="w-full max-w-[500px] border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">
                Failed to load data
              </CardTitle>
              <CardDescription>
                {this.state.error?.message ||
                  "An error occurred while fetching data from Convex."}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
