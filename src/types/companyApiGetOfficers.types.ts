type Address = {
  address_line_1: string;
  address_line_2?: string;
  care_of?: string;
  country?: string;
  locality?: string;
  po_box?: string;
  postal_code?: string;
  premises?: string;
  region?: string;
};

type DateOfBirth = {
  day?: number;
  month?: number;
  year: number;
};

type FormerName = {
  forenames: string;
  surname: string;
};

type Identification = {
  identification_type: string;
  legal_authority?: string;
  legal_form?: string;
  place_registered?: string;
  registration_number?: string;
};

type Links = {
  officer: {
    appointments: string;
  };
  self: string;
};

export type Officer = {
  address: Address;
  appointed_before?: string;
  appointed_on: string;
  contact_details?: {
    contact_name: string;
  };
  country_of_residence?: string;
  date_of_birth?: DateOfBirth;
  etag?: string;
  former_names?: FormerName[];
  identification?: Identification;
  is_pre_1992_appointment?: boolean;
  links: Links;
  name: string;
  nationality?: string;
  occupation?: string;
  officer_role?: string;
  principal_office_address?: Address;
  resigned_on?: string;
  responsibilities?: string;
};

export type CompanyApiGetOfficersResponse = {
  active_count: number;
  etag: string;
  items: Officer[];
  items_per_page: number;
  kind: "officer-list";
  links: {
    self: string;
  };
  resigned_count: number;
  start_index: number;
  total_results: number;
};
