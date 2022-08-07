export const SORT_OPTIONS = {
  DEFAULT: "default",
  NAME: "name",
  ROLE: "role",
  ACTIVE: "active",
}

export const LABEL_OPTIONS = {
  DEFAULT: "Por Defecto",
  NAME: "Por Nombre",
  ROLE: "Por Rol",
  ACTIVE: "Por Estado",
}

export const ROLE_OPTIONS = {
  TEACHER: "teacher",
  STUDENT: "student",
  OTHER: "other",
}

export const OPTIONS_SELECT = [
  {
    value: SORT_OPTIONS.DEFAULT,
    label: LABEL_OPTIONS.DEFAULT,
  },
  {
    value: SORT_OPTIONS.NAME,
    label: LABEL_OPTIONS.NAME,
  },
  {
    value: SORT_OPTIONS.ROLE,
    label: LABEL_OPTIONS.ROLE,
  },
  {
    value: SORT_OPTIONS.ACTIVE,
    label: LABEL_OPTIONS.ACTIVE,
  },
]
