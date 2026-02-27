import Dexie from 'dexie';

export const db = new Dexie('PlannerDB_Final');

db.version(2).stores({
  // AÑADIMOS 'reminder' AL FINAL
  events: '++id, title, start, end, allDay, color, description, reminder, source, calendarName', // Añadido source y calendarName
  tasks: 'id, title, completed, createdAt',
  notes: 'id, title, content, color, pinned, createdAt',
  settings: 'key' // Key-Value store (e.g. key='icloudConfig', key='preferences')
});

db.version(3).stores({
    settings: 'key' // Explicitly adding it for version 3 to trigger upgrade if needed
});