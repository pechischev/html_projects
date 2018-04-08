import IMemoryStorageProps from '../memoryStorage/IMemoryStorageProps';
import Card from '../../model/Card';

interface ICardViewProps extends IMemoryStorageProps {
    card: Card;
    index: number;
    listId: string;
}

export default ICardViewProps;