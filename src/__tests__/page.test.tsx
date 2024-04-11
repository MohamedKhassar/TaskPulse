import { render, screen } from "@testing-library/react"
import NavBar from "@/components/NavBar";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("testing ui", () => {
    test("render", async () => {
        render(<NavBar />)
        expect(screen.getByText("TaskPulse")).toBeInTheDocument()
    })
})