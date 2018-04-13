import Dispatcher from 'common/event/Dispatcher';

class Timer {
	private _keyInterval: any; // TODO: fix typization
	private _delay: any;
	private _start: any;
	private _duration: any;
	private _startEvent: Dispatcher;
	private _tickEvent: Dispatcher;
	private _stopEvent: Dispatcher;

	constructor(delay?: number) {
		this._delay = delay || 500;
		this._start = 0;
		this._duration = null;
		this._keyInterval = null;

		this._startEvent = new Dispatcher();
		this._tickEvent = new Dispatcher();
		this._stopEvent = new Dispatcher();
	}

	startEvent(): Dispatcher {
		return this._startEvent;
	}

    tickEvent(): Dispatcher {
		return this._tickEvent;
	}

	stopEvent(): Dispatcher {
		return this._stopEvent;
	}

	run() {
		this._startEvent.dispatch();
		this._start = Date.now();
		this._keyInterval = setInterval(() => {
			this._tickEvent.dispatch();
		}, this._delay);
    }

	stop() {
		clearInterval(this._keyInterval);
		this._stopEvent.dispatch();
    }

	getDuration(): number {
		if (!this._duration)
		{
			return (Date.now() - this._start);
		}
		return this._duration;
	}
}

export default Timer;