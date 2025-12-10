export interface EmergencyAlert {
    id: number;
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    time: string;
    location?: string;
}

export const emergencyAlerts: EmergencyAlert[] = [
    {
        id: 1,
        title: 'Severe Thunderstorm Warning',
        description: 'A severe thunderstorm warning is in effect for the metropolitan area. Expect heavy rain, lightning, and strong winds up to 60 mph. Seek shelter immediately.',
        severity: 'high',
        time: '10 min ago',
        location: 'Downtown & Surrounding Areas',
    },
    {
        id: 2,
        title: 'Traffic Congestion Alert',
        description: 'Major traffic delays on Interstate 95 due to multi-vehicle accident. Consider alternate routes. Expected clearance time: 2 hours.',
        severity: 'medium',
        time: '25 min ago',
        location: 'Interstate 95, Mile Marker 42',
    },
    {
        id: 3,
        title: 'Air Quality Advisory',
        description: 'Air quality index has reached moderate levels. People with respiratory conditions should limit outdoor activities.',
        severity: 'low',
        time: '1 hour ago',
        location: 'City-wide',
    },
    {
        id: 4,
        title: 'Power Outage Notice',
        description: 'Scheduled power maintenance will affect the eastern district. Outage expected from 10 PM to 2 AM tonight.',
        severity: 'medium',
        time: '2 hours ago',
        location: 'Eastern District',
    },
    {
        id: 5,
        title: 'Community Event Reminder',
        description: 'Annual city marathon this Saturday. Expect road closures in the downtown area from 6 AM to 2 PM.',
        severity: 'low',
        time: '3 hours ago',
        location: 'Downtown Core',
    },
    {
        id: 6,
        title: 'Flash Flood Watch',
        description: 'Flash flood watch in effect until midnight. Low-lying areas may experience flooding. Avoid driving through standing water.',
        severity: 'high',
        time: '45 min ago',
        location: 'Riverside & Valley Areas',
    },
];
