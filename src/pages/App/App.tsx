import { useDispatch, useSelector } from 'react-redux';
import Circle from '../../components/Circle/Circle';
import { idIterator } from '../../utils/idIterator';
import { StoreDispatch, StoreState } from '../../context/store';
import {
  newCurrentElement,
  replaceCurrentElement,
} from '../../context/element/elementSlice';
import Rectangle from '../../components/Rectangle/Rectangle';
import './styles.css';
import {
  clearHistory,
  popRedo,
  popUndo,
} from '../../context/history/historySlice';
import Toolbar from '../../components/Toolbar/Toolbar';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';

function App() {
  const {
    element,
    history: { undo, redo },
  } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<StoreDispatch>();

  const handleReplaceElement = () => {
    let id: number = 0;
    const newId = idIterator.next();
    if (!newId.done) id = newId.value;

    dispatch(newCurrentElement({ newCircle: { value: id } }));
  };

  const handlePopUndo = () => {
    const prevCircle = undo.slice(-1)[0];

    if (prevCircle && element.currentCircle) {
      dispatch(popUndo({ currentCircle: element.currentCircle }));
      dispatch(replaceCurrentElement({ newCircle: prevCircle }));
    }
  };

  const handlePopRedo = () => {
    const nextCircle = redo.slice(-1)[0];

    if (nextCircle && element.currentCircle) {
      dispatch(popRedo({ currentCircle: element.currentCircle }));
      dispatch(replaceCurrentElement({ newCircle: nextCircle }));
    }
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <div className='app'>
      <Toolbar>
        <Button onClick={handleReplaceElement}>Generate new element</Button>
        <Button isDisabled={!undo.length} onClick={handlePopUndo}>
          Pop undo
        </Button>
        <Button isDisabled={!redo.length} onClick={handlePopRedo}>
          Pop redo
        </Button>
        <Button
          isDisabled={!redo.length && !undo.length}
          onClick={handleClearHistory}
        >
          Clear history
        </Button>
      </Toolbar>

      <main>
        <section>
          <Badge className='wrapper center'>
            <h2 className='header'>Current Element</h2>
          </Badge>
          {element.currentCircle?.value && (
            <div className='wrapper center'>
              <Circle value={element.currentCircle?.value}></Circle>
            </div>
          )}
        </section>
        <section className='wide'>
          <Badge className='wrapper center'>
            <h1>History</h1>
          </Badge>
          <div className='border'>
            <Badge className='wrapper center'>
              <h2 className='header'>Undo</h2>
            </Badge>
            <Rectangle>
              {undo.map(({ value }) => (
                <Circle key={value} value={value}></Circle>
              ))}
            </Rectangle>
          </div>
          <div className='border'>
            <Badge className='wrapper center'>
              <h2 className='header'>Redo</h2>
            </Badge>
            <Rectangle>
              {redo.map(({ value }) => (
                <Circle key={value} value={value}></Circle>
              ))}
            </Rectangle>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
