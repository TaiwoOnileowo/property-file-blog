import { create } from 'zustand';

interface SeriesItem {
	seriesTitle: string;
	seriesSlug: string;
}

interface SeriesStore {
	seriesNames: SeriesItem[];
	setSeriesNames: (series: SeriesItem[]) => void;
	clearSeriesNames: () => void;
}

export const useSeriesStore = create<SeriesStore>((set) => ({
	seriesNames: [],
	setSeriesNames: (series) => set({ seriesNames: series }),
	clearSeriesNames: () => set({ seriesNames: [] }),
}));
