const SESSION_EXPIRED_EVENT = "sessionExpired";

type SessionExpiredCallback = () => void;

class AuthEvents {
  private target = new EventTarget();

  onSessionExpired(callback: SessionExpiredCallback) {
    const handler = () => callback();
    this.target.addEventListener(SESSION_EXPIRED_EVENT, handler);
    return () => {
      this.target.removeEventListener(SESSION_EXPIRED_EVENT, handler);
    };
  }

  emitSessionExpired() {
    this.target.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }
}

export const authEvents = new AuthEvents();
