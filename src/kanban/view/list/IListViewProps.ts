import IMemoryStorageProps from '../memoryStorage/IMemoryStorageProps';
import List from '../../model/List';

interface IListViewProps extends IMemoryStorageProps {
    list: List;
}

export default IListViewProps;