export module Configs {
	export const connectionData: ConnectionData = Object.create(null);
}

export type ConnectionData = {
	database: string;
	table: string;
	encrypted: boolean;
	mode: "no-encryption";
};
