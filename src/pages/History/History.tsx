import { useDispatch, useSelector } from 'react-redux';
import Circle from '../../components/Circle/Circle';
import { idIterator } from '../../utils/idIterator';
import { StoreDispatch, StoreState } from '../../context/store';
import { newCurrentElement, replaceCurrentElement } from '../../context/element/elementSlice';
import Rectangle from '../../components/Rectangle/Rectangle';
import './styles.css';
import { clearHistory, popRedo, popUndo } from '../../context/history/historySlice';
import Toolbar from '../../components/Toolbar/Toolbar';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';

function AlternateView() {
  const {
    element,
    history: { undo, redo },
  } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<StoreDispatch>();

  const handleGenerateElement = () => {
    let id = 0;
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
    <div className="history-block">
      <Toolbar className="history-block__toolbar">
        <Button onClick={handleGenerateElement}>Generate new element</Button>
        <Button isDisabled={!undo.length} onClick={handlePopUndo}>
          Undo
        </Button>
        <Button isDisabled={!redo.length} onClick={handlePopRedo}>
          Redo
        </Button>
        <Button isDisabled={!redo.length && !undo.length} onClick={handleClearHistory}>
          Clear history
        </Button>
      </Toolbar>

      <main className="history-block__main">
        <section className="history-section">
          <div>
            <div className="history-section__secondary-header">
              <Badge className="history-section__badge history-section__badge_center history-section__badge_narrow">
                <h2>Undo history stack</h2>
              </Badge>
            </div>
            <Rectangle>
              {undo.map(({ value }) => (
                <Circle key={value} value={value}></Circle>
              ))}
            </Rectangle>
          </div>
        </section>
        <section className="history-section">
          <div className="history-section__secondary-header">
            <Badge className="history-section__badge history-section__badge_center history-section__badge_wide">
              <h2>Current Element</h2>
            </Badge>
          </div>
          <Rectangle>
            <div className="history-section__element">
              <Circle value={element.currentCircle?.value}></Circle>
            </div>
          </Rectangle>
        </section>
        <section className="history-section">
          <div>
            <div className="history-section__secondary-header">
              <Badge className="history-section__badge history-section__badge_center history-section__badge_narrow">
                <h2>Redo history stack</h2>
              </Badge>
            </div>
            <Rectangle className="history-section__rectangle_reverse">
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

export default AlternateView;
