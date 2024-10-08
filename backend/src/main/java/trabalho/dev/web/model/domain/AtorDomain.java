package trabalho.dev.web.model.domain;

import jakarta.persistence.*;

@Entity(name = "Ator")
public class AtorDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;

    @Column(nullable = false, length = 40)
    private String nome;

    public AtorDomain(String nome) {
        this.nome = nome;
    }

    public AtorDomain(String nome, int id) {
        this.nome = nome;
        this.id = id;
    }

    public AtorDomain(){
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
