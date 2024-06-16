// A way of notifying change to a number of classes
class WeatherStation {
    constructor() {
        this.observers = [];
        this.temperature = 0;
    }
    attach(observer) {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been already attached.');
        }
        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }
    detach(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }
        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }
    notify() {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
    setTemperature(temp) {
        console.log(`WeatherStation: New temperature measurement: ${temp}`);
        this.temperature = temp;
        this.notify();
    }
    getTemperature() {
        return this.temperature;
    }
}
class TemperatureDisplay {
    update(subject) {
        if (subject instanceof WeatherStation) {
            console.log(`TemperatureDisplay: Reacted to the temperature update: ${subject.getTemperature()}°C`);
        }
    }
}
class Fan {
    update(subject) {
        if (subject instanceof WeatherStation && subject.getTemperature() > 25) {
            console.log('Fan: It\'s hot here, turning myself on...');
        }
        else {
            console.log('Fan: It\'s nice and cool, turning myself off...');
        }
    }
}
// Client code
const weatherStation = new WeatherStation();
const tempDisplay = new TemperatureDisplay();
const fan = new Fan();
weatherStation.attach(tempDisplay);
weatherStation.attach(fan);
weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
//# sourceMappingURL=observer.js.map