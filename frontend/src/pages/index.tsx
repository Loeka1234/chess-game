import React, { useState } from "react";
import { King } from "../components/King.comp";
import { Pawn } from "../components/Pawn.comp";
import { Rook } from "../components/Rook.comp";

const getInitialChessPieces = (): ChessPiece[] => {
  const pieces: Omit<ChessPiece, "player">[] = [];

  // King
  pieces.push({
    type: PieceType.King,
    coords: [5, 1],
  });
  // Queen
  pieces.push({
    type: PieceType.Queen,
    coords: [4, 1],
  });
  // Rooks
  for (let i = 0; i <= 1; i++)
    pieces.push({
      type: PieceType.Rook,
      coords: [1 + i * 7, 1],
    });
  // Knights
  for (let i = 0; i <= 1; i++)
    pieces.push({
      type: PieceType.Knight,
      coords: [2 + i * 5, 1],
    });
  // Bishops
  for (let i = 0; i <= 1; i++)
    pieces.push({
      type: PieceType.Bishop,
      coords: [3 + i * 3, 1],
    });
  // Pawns
  for (let i = 0; i <= 7; i++)
    pieces.push({
      type: PieceType.Pawn,
      coords: [1 + i, 2],
    });

  const whitePieces = pieces.map((p) => ({
    ...p,
    player: Player.White,
  }));
  const blackPieces = [...whitePieces].map<ChessPiece>((piece) => ({
    ...piece,
    coords: [
      piece.coords[0],
      piece.coords[1] + (piece.type === PieceType.Pawn ? 5 : 7),
    ],
    player: Player.Black,
  }));

  return [...whitePieces, ...blackPieces];
};

export enum Player {
  White = "white",
  Black = "black",
}

enum PieceType {
  King = "King",
  Queen = "Queen",
  Bishop = "Bishop", // Loper
  Rook = "Rook", // Toren
  Pawn = "Pawn", // Pion
  Knight = "Knight", // Paard
}

type Coords = [number, number];

interface ChessPiece {
  type: PieceType;
  coords: Coords;
  player: Player;
}

const HomePage = () => {
  const [chessPieces, setChessPieces] = useState<ChessPiece[]>(
    getInitialChessPieces()
  );

  console.log(chessPieces);

  const areCoordsTheSame = (coords1: Coords, coords2: Coords) =>
    coords1[0] === coords2[0] && coords1[1] === coords2[1];

  const getPiece = (coords: Coords) => {
    const piece = chessPieces.find((piece) =>
      areCoordsTheSame(piece.coords, coords)
    );
    if (!piece) return undefined;

    switch (piece.type) {
      case PieceType.Pawn:
        return <Pawn player={piece.player} />;
      case PieceType.King:
        return <King player={piece.player} />;
      case PieceType.Rook:
        return <Rook player={piece.player} />;
      default:
        return piece.type.toString();
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="w-96 h-96 border-2 border-black">
        {[...Array(8)].map((_, rowIndex) => (
          <div className="w-full h-1/8" key={rowIndex}>
            {[...Array(8)].map((_, columnIndex) => (
              <div
                className={`w-1/8 h-full float-left ${
                  rowIndex % 2 === 0
                    ? columnIndex % 2 === 0
                      ? "bg-gray-700"
                      : "bg-gray-300"
                    : columnIndex % 2 !== 0
                    ? "bg-gray-700"
                    : "bg-gray-300"
                }`}
                key={columnIndex}
              >
                {getPiece([columnIndex + 1, rowIndex + 1])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
