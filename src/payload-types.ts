/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    records: Record;
    media: Media;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface Record {
  id: string;
  title: string;
  category?:
    | (
        | 'mandarin-speech-video'
        | 'mandarin-video'
        | 'mandarin-thesis'
        | 'mandarin-article'
        | 'mandarin-file'
        | 'mandarin-website'
        | 'mandarin-social-media'
        | 'mandarin-book'
        | 'translated-video'
        | 'waiting-for-translate-video'
        | 'activity-log-n-data'
        | 'psychedelics-fundamentals'
        | 'online-media'
        | 'research-centre'
        | 'ngo-research-institute'
        | 'private-research-institute'
        | 'ngo-foundation'
        | 'therapy-institue'
        | 'health-n-safety'
        | 'psychotherapy-training'
        | 'decriminalize-policy'
        | 'psychotherapists'
        | 'press-n-journal'
        | 'conference'
        | 'podcast-speech'
        | 'research-topics'
        | 'influential-people'
      )
    | null;
  type?:
    | (
        | 'video'
        | 'youtube-channel'
        | 'instagram'
        | 'twitter'
        | 'facebook'
        | 'podcast'
        | 'article'
        | 'website'
        | 'thesis'
        | 'pdf'
        | 'book'
      )
    | null;
  language: 'zh-tw' | 'en';
  url?: string | null;
  richText?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  slug?: string | null;
  isRecordShow: boolean;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename: string;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}