export interface EventList {
    id: number;
    created_at: string;
    date: string;
    name: string;
    total?: number;
    underwriter: string;
}

export type StandList = {
    id: number;
    created_at: string;
    name: string;
    total?: number;
    category: 'food' | 'gas' | 'hotel' | 'ticket';
    members?: Array<string>;
}

export interface DropDown {
    name: string;
    icon?: string;
}