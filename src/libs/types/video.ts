export interface aiProjectType {
  source_type: number;
  source_instance: string;
  mask_source_instance: string;
  source_url: string;
  source_ai_url: string;
  position: number;
  data: string;
  id: number;
}

export interface aiChoiceType {
  source_url: string;
  position: number;
  id?: number;
}

export type videoType = 1 | 2;

export type videoAuthType = string | undefined;

export interface snapshotsType {
  exist_tuber: number;
  tab_type: number;
  tuber_num: number;
  tuber_size_x: number;
  tuber_size_y: number;
  intimal_thickness: number;
  patch_echoes: number;
  patch_size_long: number;
  patch_size_thick: number;
  luminal_patch: number;
}
