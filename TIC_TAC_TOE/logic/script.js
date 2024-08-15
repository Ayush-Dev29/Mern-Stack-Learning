document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let isXTurn = true;

    const checkWin = (currentPlayer) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            });
        });
    };

    const handleClick = (e) => {
        const cell = e.target;
        const currentPlayer = isXTurn ? 'X' : 'O';

        if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            cell.classList.add(currentPlayer);
            cell.textContent = currentPlayer;

            if (checkWin(currentPlayer)) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                resetBoard();
            } else if (Array.from(cells).every(cell => cell.classList.contains('X') || cell.classList.contains('O'))) {
                setTimeout(() => alert(`It's a draw!`), 100);
                resetBoard();
            } else {
                isXTurn = !isXTurn;
            }
        }
    };

    const resetBoard = () => {
        cells.forEach(cell => {
            cell.classList.remove('X');
            cell.classList.remove('O');
            cell.textContent = '';
        });
        isXTurn = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetBoard);
});
