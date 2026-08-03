import {Component, type ErrorInfo, type ReactNode} from 'react';
import {devLog, getErrorOccurredAgo} from "../utils.ts";
import {CountdownTimer} from "./CountdownTimer.tsx";

interface Props {
  children: ReactNode;
  /** Custom fallback UI shown momentarily while the page reloads */
  fallback?: ReactNode;
  bounceRate?: number;
}

interface State {
  hasError: boolean;
}

const caughtError = devLog('ViteChunkErrorHandler caught an error', "table");
const blockedReload = devLog('ViteChunkErrorHandler: Chunk error detected, but reloading is blocked.');

export class ViteVersionErrorHandler extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return {hasError: true};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to your analytics or tracking service here
    caughtError([{error, errorInfo}]);

    const bounceRate = this.props.bounceRate ?? 10000;

    const errorMessage = error.message || '';

    // Vite specifically triggers these messages when a hashed chunk file is missing
    const isChunkError =
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Loading chunk') ||
      error.name === 'ChunkLoadError';

    if (isChunkError) {
      // Use sessionStorage to prevent infinite reload loops if the site is completely down
      const {errorOccurredAgo, now} = getErrorOccurredAgo();

      // Only auto-reload if we haven't reloaded due to a chunk error in the last 10 seconds
      if (errorOccurredAgo > bounceRate) {
        sessionStorage.setItem('chunk_error_reload', now.toString());
        window.location.reload();
      } else {
        setTimeout(() => {
          sessionStorage.setItem('chunk_error_reload', now.toString());
          window.location.reload();
        }, bounceRate - errorOccurredAgo);

        blockedReload(`Waiting ${errorOccurredAgo} milliseconds before retrying.`)

      }
    }
  }


  public render(): ReactNode {
    const {errorOccurredAgo} = getErrorOccurredAgo();
    const bounceRate = this.props.bounceRate ?? 10000;

    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif'}}>
          <h3>Updating application...</h3>
          <p>We are loading the latest version of the app.</p>
          <p>Retrying in <CountdownTimer
            duration={Math.floor((bounceRate - errorOccurredAgo) / 1000)}/> seconds...</p>
        </div>
      );
    }

    return this.props.children;
  }
}