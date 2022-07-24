import { useContext } from 'react';
import { SketchContext } from "../sketch/SketchContext";
export default function useSketch() {
  return useContext(SketchContext);
}