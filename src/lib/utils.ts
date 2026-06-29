/**
 * Log level for development-only logging.
 */
export type LogLevel = "log" | "error" | "warn" | "table" | "info";

/**
 * A development-only logging function that conditionally logs messages based on the environment.
 *
 * @param {string} message The message to be logged.
 * @param {LogLevel} [level='log'] The log level to use (default: 'log').
 * @returns void
 */
export const devLog = (message: string, level: LogLevel = "log") => {
  return (errors?: unknown) => {
    if (
      [
        import.meta.env.MODE, // Prioritize Vite primary support
        // process.env.NODE_ENV, // Uncomment for Node environment
      ].includes("development")
    ) {
      const loggedMessage = `Dev Only - ${message}`
      if (level === "table") {
        console.log(loggedMessage);
        console[level](errors);
      } else {
        console[level](loggedMessage, errors);
      }
    }
  };
};

export function getErrorOccurredAgo() {
  const lastReload = sessionStorage.getItem('chunk_error_reload');
  const now = Date.now();

  return {
    now,
    errorOccurredAgo: !lastReload ? 0 : now - parseInt(lastReload, 10),
  };
}