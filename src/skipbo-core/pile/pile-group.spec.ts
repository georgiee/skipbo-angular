import { PileGroup } from './pile-group';
import { Card } from '../card';
import { AbstractPile, PileRole } from './pile-abstract';
import { BuildingPile } from './building-pile';

class SimplePileImpl extends AbstractPile {
  constructor() {
    super(PileRole.BUILDING);
  }
}

let group: PileGroup<SimplePileImpl>;
let pile1: SimplePileImpl = new SimplePileImpl();
let pile2: SimplePileImpl = new SimplePileImpl();

// create an array of cards from 1 - 12
const createFullPile = () => Array.from(Array(12)).map((value, index) => index + 1);

describe('Pile Group', () => {
  beforeEach(() => {
    group = new PileGroup();
    group.add((pile1 = new SimplePileImpl()));
    group.add((pile2 = new SimplePileImpl()));
  });

  describe('building group', () => {
    beforeEach(() => {
      group = new PileGroup<BuildingPile>();
      group.add((pile1 = new BuildingPile()));
      group.add((pile2 = new BuildingPile()));
    });

    it('throws error when trying to auto-place wrong card', () => {
      expect(() => {
        group.autoPlace(Card.Two);
      }).toThrowError(`Can't auto-place this card with the current set of piles`);
    });

    it('clears a pile without touching the others', () => {
      const fullSet = createFullPile();
      group.autoPlaceCards(Card.One);
      group.autoPlaceCards(Card.Two);
      group.autoPlaceCards(Card.Three);
      group.autoPlaceCards(Card.Four);
      group.autoPlaceCards(...fullSet);

      expect(pile1.top).toBe(Card.Twelve);

      group.cleanup();
      expect(pile1.top).toBe(Card.Empty);
      expect(pile2.top).toBe(Card.Four);
    });

    it('give top cards from all piles', () => {
      group.autoPlaceCards(Card.One);
      group.autoPlaceCards(Card.Two);
      group.autoPlaceCards(Card.Three);
      group.autoPlaceCards(Card.Four);
      group.autoPlaceCards(Card.One);
      group.autoPlaceCards(Card.Two);

      expect(group.getTopCards()).toEqual([Card.Four, Card.Two]);
    });

    it('display card as ascii', () => {
      const fullSet = createFullPile();
      group.autoPlaceCards(Card.One);
      group.autoPlaceCards(...fullSet);
      expect(group.display()).toBe(`1|1
2|░
3|░
4|░
5|░
6|░
7|░
8|░
9|░
10|░
11|░
12|░`);

      expect(pile1.top).toBe(Card.Twelve);
    });
  });

  it('returns all pile instance', () => {
    expect(group.getPiles().length).toBe(2);
  });

  it('return pile count', () => {
    expect(group.count).toBe(2);
  });

  it('get possible piles', () => {
    const piles = group.getPileCandidates(Card.One);
    expect(piles.length).toBe(2);
  });

  it('has zero piles for impossible card to build', () => {
    pile1.canPlace = () => false;
    pile2.canPlace = () => false;

    const piles = group.getPileCandidates(Card.Two);
    expect(piles.length).toBe(0);
  });

  it('can auto place on candidate', () => {
    group.autoPlace(Card.One);
    group.autoPlace(Card.Two);
    group.autoPlace(Card.Three);
    group.autoPlace(Card.One);

    expect(pile1.top).toBe(Card.Three);
    expect(pile2.top).toBe(Card.One);
  });

  it('can auto place wild card', () => {
    group.autoPlace(Card.One);
    group.autoPlace(Card.SkipBo);
    group.autoPlace(Card.SkipBo);
    group.autoPlace(Card.SkipBo);

    expect(pile1.top).toBe(Card.Two);
    expect(pile2.top).toBe(Card.Two);
  });

  it('can auto place multiple cars', () => {
    group.autoPlaceCards(Card.One, Card.SkipBo, Card.SkipBo, Card.SkipBo);

    expect(pile1.top).toBe(Card.Two);
    expect(pile2.top).toBe(Card.Two);
  });
});
