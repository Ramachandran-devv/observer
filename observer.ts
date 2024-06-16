// A way of notifying change to a number of classes

// The Observer design pattern is a behavioral design pattern that defines a one-to-many dependency between objects 
// so that when one object changes state, all its dependents are notified and updated automatically. 
// This pattern is especially useful for implementing distributed event-handling systems,
//  in scenarios where an object needs to notify other objects without making assumptions about who those objects are.
//  Essentially, the Observer pattern promotes loose coupling.

interface Observer {
    update(subject: Subject): void;
}

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

class WeatherStation implements Subject {
    private observers: Observer[] = [];
    private temperature: number = 0;

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been already attached.');
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public setTemperature(temp: number): void {
        console.log(`WeatherStation: New temperature measurement: ${temp}`);
        this.temperature = temp;
        this.notify();
    }

    public getTemperature(): number {
        return this.temperature;
    }
}

class TemperatureDisplay implements Observer {
    public update(subject: WeatherStation): void {
        if (subject instanceof WeatherStation) {
            console.log(`TemperatureDisplay: Reacted to the temperature update: ${subject.getTemperature()}°C`);
        }
    }
}

class Fan implements Observer {
    public update(subject: WeatherStation): void {
        if (subject instanceof WeatherStation && subject.getTemperature() > 25) {
            console.log('Fan: It\'s hot here, turning myself on...');
        } else {
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
