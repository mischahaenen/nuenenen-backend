import type { Schema, Struct } from '@strapi/strapi';

export interface PagesBlog extends Struct.ComponentSchema {
  collectionName: 'components_pages_blogs';
  info: {
    description: '';
    displayName: 'Blog';
    icon: 'blog';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface PagesContact extends Struct.ComponentSchema {
  collectionName: 'components_pages_contacts';
  info: {
    description: '';
    displayName: 'Contact';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface PagesDocument extends Struct.ComponentSchema {
  collectionName: 'components_pages_documents';
  info: {
    description: '';
    displayName: 'Documents';
  };
  attributes: {
    files: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface PagesGroup extends Struct.ComponentSchema {
  collectionName: 'components_pages_groups';
  info: {
    description: '';
    displayName: 'Team';
    icon: 'photo-video';
  };
  attributes: {
    leaders: Schema.Attribute.Relation<'oneToMany', 'api::team.team'>;
    Title: Schema.Attribute.String;
  };
}

export interface PagesImage extends Struct.ComponentSchema {
  collectionName: 'components_pages_images';
  info: {
    description: '';
    displayName: 'Image';
    icon: 'file-image';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface PagesKastenzeddel extends Struct.ComponentSchema {
  collectionName: 'components_pages_kastenzeddels';
  info: {
    description: '';
    displayName: 'Aktivit\u00E4t';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    EndDate: Schema.Attribute.Date;
    EndTime: Schema.Attribute.Time;
    Location: Schema.Attribute.String;
    StartDate: Schema.Attribute.Date;
    StartTime: Schema.Attribute.Time;
    Title: Schema.Attribute.String;
  };
}

export interface PagesPfadiheim extends Struct.ComponentSchema {
  collectionName: 'components_pages_pfadiheims';
  info: {
    description: '';
    displayName: 'Pfadiheim';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    iFrame: Schema.Attribute.String;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface PagesQuartalsprogramm extends Struct.ComponentSchema {
  collectionName: 'components_pages_quartalsprogramms';
  info: {
    description: '';
    displayName: 'Quartalsprogramm';
    icon: 'calendar';
  };
  attributes: {
    Document: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface PagesSection extends Struct.ComponentSchema {
  collectionName: 'components_pages_sections';
  info: {
    description: '';
    displayName: 'section';
    icon: 'bars';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface PagesSteps extends Struct.ComponentSchema {
  collectionName: 'components_pages_steps';
  info: {
    description: '';
    displayName: 'Steps';
    icon: 'archway';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    steps: Schema.Attribute.Relation<'oneToMany', 'api::step.step'>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'pages.blog': PagesBlog;
      'pages.contact': PagesContact;
      'pages.document': PagesDocument;
      'pages.group': PagesGroup;
      'pages.image': PagesImage;
      'pages.kastenzeddel': PagesKastenzeddel;
      'pages.pfadiheim': PagesPfadiheim;
      'pages.quartalsprogramm': PagesQuartalsprogramm;
      'pages.section': PagesSection;
      'pages.steps': PagesSteps;
    }
  }
}
