import type { Schema, Attribute } from '@strapi/strapi';

export interface PagesBlog extends Schema.Component {
  collectionName: 'components_pages_blogs';
  info: {
    displayName: 'Blog';
    icon: 'blog';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.RichText;
  };
}

export interface PagesContact extends Schema.Component {
  collectionName: 'components_pages_contacts';
  info: {
    displayName: 'Contact';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.RichText;
  };
}

export interface PagesDocument extends Schema.Component {
  collectionName: 'components_pages_documents';
  info: {
    displayName: 'Documents';
    description: '';
  };
  attributes: {
    files: Attribute.Media;
    Title: Attribute.String;
  };
}

export interface PagesGroup extends Schema.Component {
  collectionName: 'components_pages_groups';
  info: {
    displayName: 'Team';
    icon: 'photo-video';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    members: Attribute.Relation<
      'pages.group',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PagesImage extends Schema.Component {
  collectionName: 'components_pages_images';
  info: {
    displayName: 'Image';
    icon: 'file-image';
    description: '';
  };
  attributes: {
    images: Attribute.Media;
    Title: Attribute.String;
  };
}

export interface PagesKastenzeddel extends Schema.Component {
  collectionName: 'components_pages_kastenzeddels';
  info: {
    displayName: 'Aktivit\u00E4t';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.RichText;
    StartDate: Attribute.Date;
    EndDate: Attribute.Date;
    Location: Attribute.String;
    StartTime: Attribute.Time;
    EndTime: Attribute.Time;
  };
}

export interface PagesPfadiheim extends Schema.Component {
  collectionName: 'components_pages_pfadiheims';
  info: {
    displayName: 'Pfadiheim';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.RichText;
    images: Attribute.Media;
    iFrame: Attribute.String;
  };
}

export interface PagesQuartalsprogramm extends Schema.Component {
  collectionName: 'components_pages_quartalsprogramms';
  info: {
    displayName: 'Quartalsprogramm';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Image: Attribute.Media;
    Document: Attribute.Media;
  };
}

export interface PagesSection extends Schema.Component {
  collectionName: 'components_pages_sections';
  info: {
    displayName: 'section';
    icon: 'bars';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.RichText;
    Image: Attribute.Media;
  };
}

export interface PagesSponsors extends Schema.Component {
  collectionName: 'components_pages_sponsors';
  info: {
    displayName: 'Sponsors';
    icon: 'gift';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    sponsors: Attribute.Relation<
      'pages.sponsors',
      'oneToMany',
      'api::sponsor.sponsor'
    >;
    Description: Attribute.RichText;
  };
}

export interface PagesSteps extends Schema.Component {
  collectionName: 'components_pages_steps';
  info: {
    displayName: 'Steps';
    icon: 'archway';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.RichText;
    steps: Attribute.Relation<'pages.steps', 'oneToMany', 'api::step.step'>;
  };
}

export interface PagesTestimonials extends Schema.Component {
  collectionName: 'components_pages_testimonials';
  info: {
    displayName: 'Testimonials';
  };
  attributes: {
    Title: Attribute.String;
    Subtitle: Attribute.String;
    testimonials: Attribute.Relation<
      'pages.testimonials',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'pages.blog': PagesBlog;
      'pages.contact': PagesContact;
      'pages.document': PagesDocument;
      'pages.group': PagesGroup;
      'pages.image': PagesImage;
      'pages.kastenzeddel': PagesKastenzeddel;
      'pages.pfadiheim': PagesPfadiheim;
      'pages.quartalsprogramm': PagesQuartalsprogramm;
      'pages.section': PagesSection;
      'pages.sponsors': PagesSponsors;
      'pages.steps': PagesSteps;
      'pages.testimonials': PagesTestimonials;
    }
  }
}
