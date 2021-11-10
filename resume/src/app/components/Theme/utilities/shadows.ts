import { makeStyles, Theme } from '@material-ui/core/styles';

export const shadowStyles = makeStyles(({ palette, ...theme }) => ({
    '@global': {
        ...generateShadows(theme as Theme),
    },
}));

const generateShadows = (theme: Theme) => {
    const classList:Record<string, Record<string, string>> = {};

    theme.shadows.forEach((shadow, ind) => {
        classList[`.elevation-z${ind}`] = {
            boxShadow: `${shadow} !important`,
        };
    });

    return classList;
};
