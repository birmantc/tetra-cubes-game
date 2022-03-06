import React, {useState, useEffect, useCallback} from "react";
import cn from "bem-cn-lite";

import Tetris from "../../components/Tetris";

import {CHOOSE_CUBE_PAGE} from "../../constants";

import "./GamePage.scss";
import {getImageColors} from "../../utils/colors";

const b = cn("game-page");

export default function GamePage(props) {
  const {
    cube,
    onChangePage,
    onChangeLoading,
  } = props;
  const [colors, setColors] = useState({});

  const onChangeCube = useCallback(() => {
    onChangePage(CHOOSE_CUBE_PAGE);
  }, [onChangePage]);

  useEffect(() => {
    if (!cube || !cube.src) {
      return;
    }

    getImageColors(cube.src)
      .then((colors) => {
        onChangeLoading(false);
        setColors(colors);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [cube, onChangeLoading]);

  return (
    <div className={b()}>
      <Tetris cube={cube} colors={colors} onChangeCube={onChangeCube}/>
    </div>
  );
}
