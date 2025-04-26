export type CourseStatus = 'published' | 'unpublished';

export type Course = {
  name_simplified?: string;
  name_traditional?: string;
  name_english?: string;
  description_simplified?: string;
  description_traditional?: string;
  description_english?: string;
  cover_image?: string;
  status?: string;
};
