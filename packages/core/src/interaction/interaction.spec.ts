/**
 * Created by felix on 09.05.17.
 */
import { Interaction } from './interaction';

describe('Field', () => {

    const interaction = new Interaction({
        key: 'name',
        activate: (i) => {
            i.addChild(new Interaction({ key: 'height' }))
        },
        children: [new Interaction({
            key: 'age'
        })]
    });

    it('should construct', () => {
        const i = new Interaction({
            key: 'test'
        });
        expect(i.config.key).toBe('test');
    });

/*     it('should nest and resolve', () => {
        expect(interaction.children.length).toBe(1);
        return interaction.activate().then(() => {
            expect(interaction.children.length).toBe(2);
        });
    }); */

    it('should enter child and populate path', () => {
        expect(interaction.path.length).toBe(0);
        return interaction.go(interaction.children[0])
            .then(() => {
                expect(interaction.path.length).toBe(1);
                expect(interaction.path[0].parent).toBe(interaction);
            })
    });
});
