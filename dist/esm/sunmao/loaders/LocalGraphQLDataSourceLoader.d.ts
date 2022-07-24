import { ApolloClient } from '@apollo/client';
import { DataSource } from '../typings';
import { DataSourceLoader } from '../typings';
declare class LocalGraphQLDataSourceLoader implements DataSourceLoader<any> {
    type: string;
    private client;
    constructor(client: ApolloClient<any>);
    load(): DataSource;
}
export default LocalGraphQLDataSourceLoader;
