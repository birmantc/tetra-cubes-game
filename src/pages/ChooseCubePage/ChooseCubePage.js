import React, {useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import cn from "bem-cn-lite";
import _ from "lodash";

import { getCubesNft } from "./utils";

import "./ChooseCubePage.scss";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const b = cn("choose-cube-page");

export function Cube(props) {
  const { src, name, onClick } = props;
  const isAction = Boolean(onClick);

  return (
    <div className={b("cube", { action: isAction })} onClick={onClick}>
      <img className={b("cube-img")} src={src} alt="cube" />
      <span>{name}</span>
    </div>
  );
}

function Cubes(props) {
  const { cubes = [], onClick } = props;

  useEffect(() => {}, []);

  if (!cubes.length) {
    return (
      <span className="text-secondary">
        Connect wallet to allow getting info about your cubes ( ͡° ͜ʖ ͡°)
      </span>
    );
  }

  return (
    <div className={b("cubes")}>
      <Row xs="auto" md="auto" lg="auto">
        {_.map(cubes, (cube) => {
          const { src, name } = cube;

          return (
            <Col>
              <Cube
                key={name}
                src={src}
                name={name}
                onClick={() => onClick(cube)}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default function ChooseCubePage(props) {
  const {onChangeLoading } = props;
  const [cubes, setCubes] = useState([]);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    getCubesNft({ connection, publicKey }).then((nftCubes) => {
      onChangeLoading(false);
      setCubes(nftCubes);
    });
  }, [onChangeLoading, publicKey, connection]);

  return (
    <div className={b()}>
      <h4 className={b("subtitle")}>
        My cubes
        <span className="text-secondary">({cubes.length})</span>
      </h4>
      <Cubes {...props} cubes={cubes} />
    </div>
  );
}
