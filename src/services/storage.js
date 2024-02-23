export default class StorageService {
    getAll(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    getCityById(cityId) {const trips = this.getAll('trips');
        if (trips && Array.isArray(trips)) {
            return trips.find(trip => trip.id === cityId);
        }
        return null;
    }

    setByKey(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeByKey(key) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}