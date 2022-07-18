export interface DateBeginEnd {
  begin: string;
  end: string;
}

export interface DateFormProps {
  date: DateBeginEnd;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface SpeedData {
  timestamp: string;
  download_bandwidth: number;
  upload_bandwidth: number;
}

export interface GenChartProps {
  speedDatas: SpeedData[];
}
