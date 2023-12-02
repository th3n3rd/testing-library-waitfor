import { signal } from '@angular/core';
import { waitFor } from '@testing-library/angular';

describe('AppComponent', () => {

    it("should work but it doesnt", async () => {
        const target = signal<string[]>([]);
        setTimeout(() => target.set(["foo", "bar"]), 1000);
        await waitFor(() => expect(target()).toHaveSize(2), { timeout: 3000 });
        expect(target()).toEqual(["foo", "bar"]);
    })

});
