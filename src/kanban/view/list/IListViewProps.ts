import IMemoryStorageProps from 'kanban/view/memoryStorage/IMemoryStorageProps';
import List from 'kanban/model/List';

interface IListViewProps extends IMemoryStorageProps {
    list: List;
    index: number;
}

export default IListViewProps;