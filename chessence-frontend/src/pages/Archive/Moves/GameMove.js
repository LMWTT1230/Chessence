import React from 'react';
import "./gameMove.css";

export default function GameMove(props) {
    const move = `[Event "FIDE World Chess Championship 2023"]
    [Site "Chess.com"]
    [Date "2023.04.30"]
    [Round "18"]
    [White "Nepomniachtchi, Ian"]
    [Black "Ding, Liren"]
    [Result "0-1"]
    [ECO "C84"]
    [WhiteElo "2795"]
    [BlackElo "2788"]
    [Annotator "Rafael"]
    [PlyCount "136"]
    [EventDate "2023.??.??"]
    
    {[%evp
    0,63,22,15,15,15,15,22,22,7,9,16,3,8,9,9,23,10,8,0,0,0,-3,-3,-11,0,0,-2,4,11,33,40,33,0,41,32,32,17,16,15,15,5,17,17,44,3,20,7,7,1,7,7,52,26,28,15,31,23,43,37,60,60,44,44,57,42]}
    1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. d3 b5 7. Bb3 d6 8. a4 Bd7
    9. h3 O-O 10. Be3 Na5 11. Ba2 bxa4 12. Nc3 {Deviating from 12.Bd2, played in the
    second rapid game.} 12... Rb8 13. Bb1 $5 {[%c_effect
    b1;square;b1;type;Interesting;persistent;true] A weird move, with the simple
    idea of attacking the a4-pawn. This has been played before by strong GMs.} 13...
    Qe8 {A new move.} (13... c5 {was played in all the three games I found.}) (13...
    Rxb2 14. Nxa4 Rb8 15. Nc5 $1 {[%c_effect
    c5;square;c5;type;GreatFind;persistent;true]} 15... Nc6 16. Nxd7 Qxd7 17. Rxa6
    {White has the bishop pair and some chances of an advantage.}) 14. b3 $1
    {[%c_effect b3;square;b3;type;GreatFind;persistent;true]} 14... c5 15. Nxa4 Nc6
    16. Nc3 $6 {[%c_effect c3;square;c3;type;Inaccuracy;persistent;true]} (16. c3 $1
    {[%c_effect c3;square;c3;type;GreatFind;persistent;true] is better, giving some
    life to the bishop.} 16... Be6 17. Bc2) 16... a5 17. Nd2 Be6 18. Nc4 d5 $6
    {[%c_effect d5;square;d5;type;Inaccuracy;persistent;true]} (18... Qd7 $1
    {[%c_effect d7;square;d7;type;GreatFind;persistent;true] is stronger, since
    White cannot capture the pawn.} 19. Nxa5 $2 {[%c_effect
    a5;square;a5;type;Mistake;persistent;true]} 19... Ra8 {loses the exchange.}) 19.
    exd5 Nxd5 20. Bd2 $2 {[%c_effect d2;square;d2;type;Mistake;persistent;true]} (20.
    Nxd5 {White should exploit the chance to exchange knights and again play c2-c3
    to free the bishop.} 20... Bxd5 21. c3) 20... Nxc3 $6 {[%c_effect
    c3;square;c3;type;Inaccuracy;persistent;true]} (20... Nf4 $1 {[%c_effect
    f4;square;f4;type;GreatFind;persistent;true] is better. Black has strong threats
    on the kingside, and the b1-bishop is just a passive spectator.}) 21. Bxc3 Bxc4
    22. bxc4 Bd8 23. Bd2 Bc7 24. c3 f5 {The position is more pleasant for Black,
    especially in a rapid game.} 25. Re1 Rd8 26. Ra2 Qg6 (26...e4 $5 {[%c_effect
        e4;square;e4;type;Interesting;persistent;true] The computer is not impressed by
        this move, but it looks interesting to my human eyes.} 27. dxe4 f4 28. e5 Nxe5
        {With the initiative.}) 27. Qe2 Qd6 28. g3 Rde8 29. Qf3 $1 {[%c_effect
        f3;square;f3;type;GreatFind;persistent;true] Nepomniachtchi manages to hold
        everything.} 29... e4 $6 {[%c_effect
        e4;square;e4;type;Inaccuracy;persistent;true] A bold decision, although I think
        the move should have been played before.} (29... Ne7 {is the machine's
        suggestion, avoiding Qd5.}) 30. dxe4 Ne5 31. Qg2 $1 {[%c_effect
        g2;square;g2;type;GreatFind;persistent;true]} 31... Nd3 32. Bxd3 Qxd3 33. exf5
        Rxe1+ 34. Bxe1 Qxc4 35. Ra1 $6 {[%c_effect
        a1;square;a1;type;Inaccuracy;persistent;true]} (35. Rd2 $1 {[%c_effect
        d2;square;d2;type;GreatFind;persistent;true] is more accurate. In this case,
        White can fight for the advantage, since capturing on f5 is dangerous for Black
        after} 35... Rxf5 36. Qc6 $1 {[%c_effect
        c6;square;c6;type;GreatFind;persistent;true]}) 35... Rxf5 36. Bd2 h6 37. Qc6 Rf7
        38. Re1 {The a-pawn is always dangerous, but it's well controlled, and the game
        is equal.} 38... Kh7 39. Be3 Be5 (39... Qxc3 {leads to an immediate draw after}
        40. Qe4+ Kg8 41. Rc1 Qe5 42. Qxe5 Bxe5 43. Rxc5 Bc7) 40. Qe8 (40. Qxc5 Qxc5 41.
        Bxc5 Bxc3 {This also leads to a draw.}) 40... Bxc3 {A mark of Ding's play is
        that he is never afraid of calculating variations. I suppose most players would
        not bother capturing this pawn.} 41. Rc1 Rf6 $1 {[%c_effect
        f6;square;f6;type;GreatFind;persistent;true] The only move to justify the
        capture on c3. White cannot exploit the pin due to tactical reasons.} 42. Qd7 $5
        {[%c_effect d7;square;d7;type;Interesting;persistent;true] An interesting
        practical try.} (42. Bd2 {ends in perpetual check after} 42... Qd4 43. Bxc3
        Qxf2+ 44. Kh1 Qf3+ 45. Kh2) 42... Qe2 $1 {[%c_effect
        e2;square;e2;type;GreatFind;persistent;true] The only move.} 43. Qd5 (43. Rxc3 $2
        {[%c_effect c3;square;c3;type;Mistake;persistent;true]} 43... Qe1+) 43... Bb4
        44. Qe4+ Kg8 45. Qd5+ Kh7 46. Qe4+ Rg6 $1 {[%c_effect
        g6;square;g6;type;GreatFind;persistent;true] This may be the decision that gave
        Ding the title. Nobody expected him to play for a win in this position, and this
        probably also took Nepomniachtchi by surprise.} 47. Qf5 $6 {[%c_effect
        f5;square;f5;type;Inaccuracy;persistent;true] White is in danger now, as this
        allows Black to advance the c-pawn.} (47. h4 {is a good move.} 47... h5 (47...
        a4 48. Qf5 Qg4 49. Qc2 a3 50. Rd1 {with good counterplay.}) 48. Rc2 Qg4 (48...
        Qd1+ 49. Kh2) 49. Qd3 {White has enough compensation for the pawn.}) (47. Rc2
        Qd1+ 48. Kh2 Qd6 49. h4 {is also enough for a draw.}) 47... c4 $1 {[%c_effect
        c4;square;c4;type;GreatFind;persistent;true]} 48. h4 $2 {[%c_effect
        h4;square;h4;type;Mistake;persistent;true]} (48. Qf4 {The computer points out
        this is the only move, but it's totally not human, and I don't even understand
        it.}) 48... Qd3 $1 {[%c_effect d3;square;d3;type;GreatFind;persistent;true]} 49.
        Qf3 Rf6 50. Qg4 c3 51. Rd1 Qg6 52. Qc8 Rc6 53. Qa8 Rd6 $2 {[%c_effect
        d6;square;d6;type;Mistake;persistent;true]} (53... c2 {wins on the spot:} 54.
        Rd8 c1=Q+ 55. Bxc1 Rxc1+ 56. Kh2 Qc6 $1 {[%c_effect
        c6;square;c6;type;GreatFind;persistent;true]} 57. Rh8+ Kg6) 54. Rxd6 Qxd6 55.
        Qe4+ Qg6 56. Qc4 Qb1+ 57. Kh2 a4 $2 {[%c_effect
        a4;square;a4;type;Mistake;persistent;true]} 58. Bd4 $1 {[%c_effect
        d4;square;d4;type;GreatFind;persistent;true]} 58... a3 59. Qc7 $2 {[%c_effect
        c7;square;c7;type;Mistake;persistent;true] The final part of the game is full of
        drama, and this is the last mistake.} (59. Bxg7 {I couldn't believe my eyes when
        the computer suggested this move.} 59... Kxg7 60. Qc7+ Kf6 61. Qc6+ {It's
        unbelievable, but White has perpetual check.} 61... Ke5 62. Qe8+ Kd5 63. Qa8+
        Kc4 64. Qg8+ Kb5 65. Qe8+) (59. h5 {Maybe the most human, taking the g6-square
        from the queen.} 59... Bf8 (59... a2 $2 {[%c_effect
        a2;square;a2;type;Mistake;persistent;true] even loses after} 60. Qf7) 60. Qf7
        Qd3 61. Be5 Qe4 62. Bxc3 Qe7 63. Qd5 {with a draw.}) 59... Qg6 {Now the game is
        over. The pawns are unstoppable.} 60. Qc4 c2 61. Be3 Bd6 62. Kg2 h5 $1 {[%c_effect
        h5;square;h5;type;GreatFind;persistent;true]} 63. Kf1 Be5 64. g4 hxg4 65. h5 Qf5
        66. Qd5 g3 67. f4 a2 68. Qxa2 Bxf4 0-1
    `;
    
    return (
        <div id="gameMove">
            <p>{move}</p>
        </div>
    );
}
