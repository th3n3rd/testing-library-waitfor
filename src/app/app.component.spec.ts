import { signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

    it("should work but it doesnt", async () => {
        const target = signal<string[]>([]);

        setTimeout(() => target.set(["foo", "bar"]), 1000);

        await waitFor(() => expect(target()).toHaveSize(2), { timeout: 3000 });
        expect(target()).toEqual(["foo", "bar"]);
    });

    describe("inconsistency", () => {
        beforeEach(async () => {
            const { fixture } = await render(AppComponent);

            setTimeout(() => {
                fixture.componentInstance.someText.set("why-this-is-not-working?");
            }, 1000);
        });

        it("should also work but it doesnt", async () => {
            await waitFor(() => expect(screen.queryByText(/why-this-is-not-working/)).toBeTruthy(), { timeout: 3000 });
        });

        it("does work", async () => {
            await waitFor(() => expect(screen.getByText(/why-this-is-not-working/)).toBeTruthy(), { timeout: 3000 });
        });
    })


});
