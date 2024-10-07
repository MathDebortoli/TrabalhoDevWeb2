package trabalho.dev.web.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Classe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(nullable = false, length = 40)
    private String nome;

    @Column(nullable = false)
    private double valor;

    @Column(nullable = false)
    private Date data;


    public Classe(String nome) {
        this.nome = nome;
    }

    public Classe(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }
}
