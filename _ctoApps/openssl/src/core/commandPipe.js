/**
 * @param {string} input Command line input
 */
export const commandPipe = (input) => {
  const commands = input.split('|').map((command) => command.trim());

  const pipe = {};
  for (const command of commands) {
    const tokens = command.split(' ');
    const programm = tokens.shift();
    const args = tokens.join(' ');

    pipe[programm] = args;
  }

  return pipe;
};
