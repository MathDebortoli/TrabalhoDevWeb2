package model;

import jakarta.persistence.*;

@Entity
public class Ator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @Column(nullable = false, length = 40)
    private String nome;



    public Ator(String nome) {
        this.nome = nome;
    }

    public Ator(){

    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
