import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes, onTimeUp }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);

    useEffect(() => {
        if (seconds <= 0) {
            onTimeUp();
            return;
        }
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [seconds, onTimeUp]);

    const formatTime = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const timeColorClass = seconds <= 60
        ? 'border-red-200 bg-red-50 text-[var(--danger)]'
        : 'border-black/5 bg-white/75 text-[var(--text)]';

    return (
        <div className={`rounded-full border px-4 py-2 text-lg font-bold tracking-[0.18em] ${timeColorClass}`}>
            {formatTime()}
        </div>
    );
};
export default Timer;
