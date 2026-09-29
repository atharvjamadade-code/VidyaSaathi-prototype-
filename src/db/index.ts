import Dexie, { type Table } from 'dexie';

export interface ChatMessage {
  id?: number;
  sender: 'student' | 'ai' | 'mentor';
  text: string;
  source?: string;
  timestamp: number;
  syncStatus: 'synced' | 'pending' | 'offline_only';
}

export interface DownloadedLesson {
  id: string;
  title: string;
  subject: string;
  language: 'hi' | 'en' | 'bhili';
  summary: string;
  content: string;
  downloadedAt: number;
  sizeBytes: number;
}

export interface ScholarshipRecord {
  id: string;
  name: string;
  nameHi: string;
  department: string;
  targetCategory: string[];
  eligibleDistricts: string[];
  deadline: string;
  portalUrl: string;
  isBookmarked: boolean;
  matchScore?: number;
}

export interface MoodCheckIn {
  id?: number;
  date: string;
  mood: 'good' | 'neutral' | 'stressed' | 'overwhelmed';
  notes?: string;
  timestamp: number;
}

export interface OfflineSyncQueueItem {
  id?: number;
  action: 'submit_scholarship_query' | 'mentor_message' | 'mood_log';
  payload: Record<string, unknown>;
  createdAt: number;
  status: 'pending' | 'failed' | 'synced';
}

export interface QACacheRecord {
  id?: number;
  studentId: string;
  subject: 'Physics' | 'English' | 'Political Science';
  question: string;
  answer: string;
  sourceTitle: string;
  isOfflineAnswer: boolean;
  timestamp: number;
}

export interface CareerQuizResultRecord {
  id?: number;
  clusterId: string;
  clusterName: string;
  clusterNameHi: string;
  scores: Record<string, number>;
  completedAt: number;
}

export class VidyaSaathiDB extends Dexie {
  chatHistory!: Table<ChatMessage>;
  downloadedLessons!: Table<DownloadedLesson>;
  scholarships!: Table<ScholarshipRecord>;
  moodCheckIns!: Table<MoodCheckIn>;
  syncQueue!: Table<OfflineSyncQueueItem>;
  qaCache!: Table<QACacheRecord>;
  careerQuizResult!: Table<CareerQuizResultRecord>;

  constructor() {
    super('VidyaSaathiDB');
    this.version(1).stores({
      chatHistory: '++id, sender, timestamp, syncStatus',
      downloadedLessons: 'id, subject, language, downloadedAt',
      scholarships: 'id, department, isBookmarked',
      moodCheckIns: '++id, date, timestamp',
      syncQueue: '++id, action, status, createdAt',
    });

    this.version(2).stores({
      qaCache: '++id, studentId, subject, timestamp',
    });

    this.version(3).stores({
      careerQuizResult: '++id, clusterId, completedAt',
    });
  }
}

export const db = new VidyaSaathiDB();

/**
 * Save a Q&A record and enforce max 20 records per student in local cache.
 */
export async function saveQAToCache(item: Omit<QACacheRecord, 'id'>): Promise<number> {
  const id = await db.qaCache.add(item as QACacheRecord);
  
  // Maintain top 20 limit
  const count = await db.qaCache
    .where('studentId')
    .equals(item.studentId)
    .count();

  if (count > 20) {
    const oldest = await db.qaCache
      .where('studentId')
      .equals(item.studentId)
      .sortBy('timestamp');
    
    const itemsToDelete = oldest.slice(0, count - 20);
    const deleteIds = itemsToDelete.map((i) => i.id!).filter(Boolean);
    if (deleteIds.length > 0) {
      await db.qaCache.bulkDelete(deleteIds);
    }
  }

  return Number(id);
}
