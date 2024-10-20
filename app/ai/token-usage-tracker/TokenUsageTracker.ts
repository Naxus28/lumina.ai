class TokenUsageTracker {
  private usageHistory: { timestamp: number; tokensUsed: number }[] = [];
  private readonly WINDOW_SIZE = 60000; // 1 minute in milliseconds

  addUsage(tokensUsed: number) {
    const now = Date.now();
    this.usageHistory.push({ timestamp: now, tokensUsed });
    this.cleanupOldEntries(now);
  }

  private cleanupOldEntries(now: number) {
    const cutoff = now - this.WINDOW_SIZE;
    this.usageHistory = this.usageHistory.filter(entry => entry.timestamp > cutoff);
  }

  getCurrentUsage(): number {
    return this.usageHistory.reduce((sum, entry) => sum + entry.tokensUsed, 0);
  }

  getUsageHistory(): { timestamp: number; tokensUsed: number }[] {
    return [...this.usageHistory];
  }
}

const tokenTracker = new TokenUsageTracker();