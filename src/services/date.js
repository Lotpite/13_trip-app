export class DateManager {
    constructor() {
        this.today = new Date();
    }

    // Function to get today's date
    getTodayDate() {
        return this.today;
    }

    // Function to get the date after adding a specified number of days
    getDateAfterDays(days, startDate) {
        const date = startDate ? new Date(startDate) : new Date(this.today);
        date.setDate(date.getDate() + days);
        return date;
    }

    // Function to calculate the difference between two dates in days
    getTimeDifference(date) {
        return Math.abs(date.getTime() - this.today.getTime());
    }

    getTimerData(timeDiff) {
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const diffHours = Math.ceil((timeDiff / (1000 * 3600) % 24));
        const diffMinutes = Math.ceil((timeDiff / (1000 * 60) % 60));
        const diffSeconds = Math.ceil((timeDiff / (1000 ) % 60));
        return {
            diffDays, diffHours, diffMinutes, diffSeconds
        };
    }

    getFormattedDate(date) {
        const currentMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth + 1
        return date.getDate() + '.' + currentMonth + '.' + date.getFullYear()
    }

    getFormattedDateForLimits(date) {
        return date.toISOString().split('T')[0]
    }
}