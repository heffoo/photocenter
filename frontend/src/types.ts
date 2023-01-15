export type EmployeeType = {
  firstname: string;
  id: string;
  lastname: string;
  positionId: string;
  username: string;
};

export type PositionType = {
  description: string;
  id: string;
  title: string;
};

export type EquipmentType = {
  description: string;
  id: string;
  title: string;
};

export type TaskType = {
  creatorId: string;
  executorId?: string;
  id: string;
  status: string;
  title: string;
};

export type TableType = EmployeeType | PositionType | EquipmentType | TaskType;