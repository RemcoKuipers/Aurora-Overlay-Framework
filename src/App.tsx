import {createProject} from "./project/service/ProjectService.ts";

function App() {

    const demoProject = createProject("My First Aurora Project")

    return (
        <main>
            <h1>Aurora Overlay Framework</h1>

            <h2>Development Environment Ready</h2>

            <p>
                <strong>Project ID:</strong> {demoProject.id}
            </p>

            <p>
                <strong>Project Name:</strong> {demoProject.name}
            </p>

        </main>
    );
}

export default App;